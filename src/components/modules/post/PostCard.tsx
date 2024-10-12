import React, { useState, useEffect } from "react";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import { BiSolidFilePdf } from "react-icons/bi";
import {
  FaThumbsUp,
  FaThumbsDown,
  FaEllipsisV,
  FaShareAlt,
} from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import Modal from "react-modal"; // Assuming you are using react-modal for editing
import { toast } from "sonner";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useDeletePostMutation,
  useUpdatePostMutation,
} from "@src//redux/features/post/postManagement";
import { useGetSingleUserQuery } from "@src//redux/features/user/userManagement";
import { useAppSelector } from "@src//redux/hooks";

import EditPostModal from "./editPostModal";

interface Comment {
  name: string;
  comment: string;
}
interface Vote {
  id: string;
  content: string;
}

interface Post {
  category: string;
  comments: Comment[];
  createdAt: string;
  isDeleted: boolean;
  picture: string;
  post: string;
  tag: string;
  updatedAt: string;
  // upvote: number;
  // downvote: number;
  upvote: Vote[];
  downvote: Vote[];
  favorite: [];
  user: string;
  _id: string;
}

interface CommentFormInputs {
  comment: string;
}

const PostCard: React.FC<Post> = ({
  category,
  comments,
  createdAt,
  isDeleted,
  picture,
  post,
  tag,
  upvote,
  downvote,
  favorite,
  user,
  _id,
}) => {
  const postRef = useRef<HTMLDivElement>(null); // Reference to the post content

  const handleDownloadPDF = () => {
    const element = postRef.current; // Get the post content

    if (element) {
      const opt = {
        margin: 0.5,
        filename: "post-content.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true }, // Enable useCORS
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
    }
  };
  const [isExpanded, setIsExpanded] = useState(false);
  const [postUserName, setPostUserName] = useState<string | null>(null);
  const [timeAgo, setTimeAgo] = useState("");
  const [userVote, setUserVote] = useState<"upvote" | "downvote" | null>(null); // Track user's vote

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState(post);

  const [commentId, setCommentId] = useState("");
  const { register, handleSubmit, reset } = useForm<CommentFormInputs>();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation(_id);
  const currentUser: any = useAppSelector((state) => state.auth.user);

  // Fetch post user
  // console.log(currentUser.id);
  const { data: postUser } = useGetSingleUserQuery(user);

  useEffect(() => {
    if (postUser) {
      setPostUserName(postUser?.data?.name);
    }
  }, [postUser]);

  // Time ago calculation
  const calculateTimeAgo = (date: string) => {
    const seconds = Math.floor(
      (new Date().getTime() - new Date(date).getTime()) / 1000,
    );
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return `${seconds} seconds ago`;
    if (minutes < 60) return `${minutes} minutes ago`;
    if (hours < 24) return `${hours} hours ago`;

    return `${Math.floor(hours / 24)} days ago`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(calculateTimeAgo(createdAt));
    }, 60000);

    setTimeAgo(calculateTimeAgo(createdAt)); // Initial calculation

    return () => clearInterval(interval);
  }, [createdAt]);

  const handleUpvote = async () => {
    const userId = postUser?.data?._id; // Get the current user's ID

    // Check if the user has already upvoted
    const existingUpvoteIndex = upvote.findIndex(
      (vote) => vote.userId === userId,
    );
    const existingDownvoteIndex = downvote.findIndex(
      (vote) => vote?.userId === userId,
    );

    try {
      // If the user has downvoted, remove that entry
      if (existingDownvoteIndex !== -1) {
        const updatedDownvotes = [
          ...downvote.slice(0, existingDownvoteIndex),
          ...downvote.slice(existingDownvoteIndex + 1),
        ];

        await updatePost({
          id: _id,
          payload: { downvote: updatedDownvotes }, // Update downvotes first
        }).unwrap();
      }

      // If the user has not upvoted yet, add the upvote
      if (existingUpvoteIndex === -1) {
        const updatedUpvotes = [...upvote, { userId: userId, upvote: 1 }];

        await updatePost({
          id: _id,
          payload: { upvote: updatedUpvotes }, // Add the upvote
        }).unwrap();
        toast.success(`Successfully upvoted!`);
      } else {
        toast.error("You have already upvoted.");
      }
    } catch (error) {
      toast.error("Failed to add upvote.");
    }
  };

  const handleDownvote = async () => {
    const userId = postUser?.data?._id; // Get the current user's ID

    // Check if the user has already downvoted
    const existingDownvoteIndex = downvote.findIndex(
      (vote) => vote?.userId === userId,
    );
    const existingUpvoteIndex = upvote.findIndex(
      (vote) => vote?.userId === userId,
    );

    try {
      // If the user has upvoted, remove that entry
      if (existingUpvoteIndex !== -1) {
        const updatedUpvotes = [
          ...upvote.slice(0, existingUpvoteIndex),
          ...upvote.slice(existingUpvoteIndex + 1),
        ];

        await updatePost({
          id: _id,
          payload: { upvote: updatedUpvotes }, // Update upvotes first
        }).unwrap();
      }

      // If the user has not downvoted yet, add the downvote
      if (existingDownvoteIndex === -1) {
        const updatedDownvotes = [...downvote, { userId: userId, downvote: 1 }];

        await updatePost({
          id: _id,
          payload: { downvote: updatedDownvotes }, // Add the downvote
        }).unwrap();
        toast.success(`Successfully downvoted!`);
      } else {
        toast.error("You have already downvoted.");
      }
    } catch (error) {
      toast.error("Failed to add downvote.");
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      toast.success(`Successfully post deleted!`);
    } catch (error) {
      toast.error("Failed to post deleted");
    }
  };

  // Copy Post Link
  const copyPostLink = () => {
    const postUrl = `${window.location.origin}/post/${_id}`;

    navigator.clipboard.writeText(postUrl);
    toast.success("Post link copied to clipboard!");
  };

  // Handle Modal Submit (Edit Post)
  const handleModalSubmit = () => {
    // TODO: Call your API to update the post content
    setIsModalOpen(false); // Close the modal after saving
  };

  // Toggle menu on/off
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // // Close menu when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (!(event.target as HTMLElement).closest(".menu-button")) {
  //       setIsMenuOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  // Badge styles for category
  const getBadgeStyles = (category: string) => {
    switch (category) {
      case "Premium":
        return "bg-yellow-200 text-yellow-800";
      case "Basic":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  // Badge styles for tag
  const getTagStyles = (tag: string) => {
    switch (tag) {
      case "Premium":
        return "bg-red-500 text-white px-6";
      case "Basic":
        return "bg-green-500 text-white px-8";
      case "Update":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const handleComment = (data) => {
    // console.log(data);
    setCommentId(data);
  };

  // Comment Submit Handler
  const onSubmit: SubmitHandler<CommentFormInputs> = async (data) => {
    try {
      // Append the new comment to the existing comments
      const updatedComments = [
        ...comments,
        { name: currentUser.name, comment: data.comment },
      ];

      await updatePost({
        id: commentId,
        payload: {
          comments: updatedComments, // Send the updated comments array
        },
      }).unwrap();
      toast.success(`Successfully added comment!`);
    } catch (error) {
      toast.error("Failed to add comment.");
    }
    reset(); // Reset form after submission
  };

  const handleFavorite = async (userId: string, postId: string) => {
    const existingId = favorite.find((id: string) => id === userId);

    if (existingId) {
      toast.error("Already saved this content in your favourite items");

      return;
    } else {
      try {
        // Append the new comment to the existing comments
        const updatedFavorite = [...favorite, userId];

        await updatePost({
          id: postId,
          payload: {
            favorite: updatedFavorite, // Send the updated comments array
          },
        }).unwrap();
        toast.success(`Successfully saved your favorite content!`);
      } catch (error) {
        toast.error("Failed to saved your favorite content!");
      }
    }
  };

  return (
    <div
      ref={postRef}
      className="bg-white shadow-md rounded-lg p-4 mb-4 transition-shadow hover:shadow-lg relative"
    >
      {/* Post Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="relative ">
          <div className="relative z-10">
            <h3 className="text-sm md:text-lg font-bold">
              {postUserName || "Unknown User"}
            </h3>
          </div>
          <span
            className={`absolute left-[80px] top-[42px] md:left-44 md:top-1/2 transform -translate-y-1/2 text-xs md:text-sm font-semibold px-1 md:px-3 py-1 rounded-full z-0 ${getBadgeStyles(
              category,
            )}`}
          >
            {category}
          </span>
          <span
            className={`absolute left-[180px] md:left-[490px] lg:left-[550px] top-[42px] md:top-4 transform -translate-y-1/2 text-xs md:text-sm font-semibold rounded-full z-0 ${getTagStyles(
              tag,
            )}`}
          >
            {tag}
          </span>
        </div>

        <div className="relative">
          <button className="menu-button text-gray-500" onClick={toggleMenu}>
            <FaEllipsisV />
          </button>
          {isMenuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                <EditPostModal postId={_id} />
              </button>
              <button
                className="block text-center w-full  px-4 py-2 hover:bg-gray-100"
                onClick={() => handleDeletePost(_id)}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-2">{timeAgo}</p>
      {/* Post Body */}
      <div>
        {isExpanded ? (
          <p className="text-gray-700 -mb-1">{post}</p>
        ) : (
          <p className="text-gray-700 -mb-1 truncate">{post}</p>
        )}
        {post.length > 100 && (
          <button
            className="text-blue-500 text-sm mb-8"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : "Read More"}
          </button>
        )}
        {picture && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img
            alt="Post Image"
            className="w-full h-64 object-cover mb-4 rounded"
            crossOrigin="anonymous"
            src={picture}
          />
        )}
        {/* <button
          className="text-blue-500 text-sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Read More"}
        </button> */}
      </div>
      {/* Upvote and Downvote */}
      <div className="flex items-center mt-4">
        <button
          className={`text-green-500 hover:text-green-700 transition ${
            userVote === "upvote" ? "text-green-700" : ""
          }`}
          onClick={handleUpvote}
        >
          <FaThumbsUp />
        </button>
        <span className="ml-1 mr-4">{upvote.length}</span>

        <button
          className={`text-red-500 hover:text-red-700 transition ${
            userVote === "downvote" ? "text-red-700" : ""
          }`}
          onClick={handleDownvote}
        >
          <FaThumbsDown />
        </button>
        <span className="ml-1 mr-4">{downvote.length}</span>

        <button
          className="text-blue-500 hover:text-blue-700 transition"
          onClick={copyPostLink}
        >
          <FaShareAlt />
        </button>
        <button
          // eslint-disable-next-line prettier/prettier
          className="text-red-500 text-xl pl-4 hover:text-red-700 transition"
          onClick={() => handleFavorite(currentUser.id, _id)}
        >
          <MdFavorite />
        </button>
        <button
          className="bg-green-500 ml-4 text-xl text-white"
          onClick={handleDownloadPDF}
        >
          <BiSolidFilePdf />
        </button>
      </div>
      {/* Comments */}
      <div className="mt-4">
        <h4 className="text-lg font-semibold">Comments</h4>
        {comments.map((comment, index) => (
          <div
            key={index}
            className="border-b bg-gray-100 rounded-lg w-72 md:w-96 mb-2 px-4 border-gray-200 py-2"
          >
            <p className="text-sm font-semibold">{comment.name}</p>
            <p className=" text-gray-700">{comment.comment}</p>
          </div>
        ))}

        <form className="mt-2" onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("comment")}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full"
            placeholder="Add a comment..."
          />
          <button
            className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2"
            type="submit"
            onClick={() => handleComment(_id)}
          >
            Comment
          </button>
        </form>
      </div>
      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
        <h2>Edit Post</h2>
        <textarea
          className="border border-gray-300 rounded-lg px-4 py-2 w-full"
          value={editedPost}
          onChange={(e) => setEditedPost(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white rounded-lg px-4 py-2 mt-2"
          onClick={handleModalSubmit}
        >
          Save
        </button>
      </Modal>
    </div>
  );
};

export default PostCard;
