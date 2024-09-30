import prisma from "../DB/db.config.js";

export const fetchComments = async (req, res) => {
  const comments = await prisma.comment.findMany({
    include: {
      user: true,
      post: {
        include: {
          user: true,
        },
      },
    },
  });
  return res.json({ status: 200, data: comments });
};

export const createComment = async (req, res) => {
  const { user_id, post_id, comment } = req.body;

  //   * Increase the comment counter
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        increment: 1,
      },
    },
  });

  const newComent = await prisma.comment.create({
    data: {
      user_id: Number(user_id),
      post_id: Number(post_id),
      comment,
    },
  });

  return res.json({
    status: 200,
    data: newComent,
    msg: "Comment created successfully.",
  });
};

// * Show user
export const showComment = async (req, res) => {
  const commentId = req.params.id;
  const post = await prisma.comment.findFirst({
    where: {
      id: Number(commentId),
    },
  });

  return res.json({ status: 200, data: post });
};

// * Delete user
export const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  //   * Increase the comment counter
  await prisma.post.update({
    where: {
      id: Number(post_id),
    },
    data: {
      comment_count: {
        decrement: 1,
      },
    },
  });
  await prisma.comment.delete({
    where: {
      id: Number(commentId),
    },
  });

  return res.json({ status: 200, msg: "Post deleted successfully" });
};




// import prisma from "../DB/db.config.js";


// export const fetchComments = async(req, res) => {
//     const comments = await prisma.comment.findMany({
        
//     })
//     return res.json({status:200, data:comments})
// };

// // show user
// export const showComment = async(req, res) => {
//     const commentId = req.params.id;
//     const post = await prisma.comment.findFirst({
//          where: {
//             id : Number(commentId)
//          }
//     })
//     return res.json({
//         status : 200 , data : post
//     })
// }


// export const createComment = async(req, res) => {
//     const { user_id, post_id, comment } = req.body;

// // Increase the comment count 

// await prisma.post.update({
//     where: {
//         id: Number(post_id)
//     },
//     data: {
//         comment_count: {
//             increment: 1,
//         }
//     }
// })
    

//      const newComment = await prisma.comment.create({
//         data: {
//             user_id: Number(user_id),
//             post_id: Number(post_id),
//             comment,
//         }
//      })

//      return res.json({status: 200, data: newComment , message: "comment created"})
//     // try {

//     // }catch(err) {
//     //     return res.status(400).json
//     // }
// }

// export const updatePost = async(req, res) => {

//     const postId = req.params.id;
//     const {user_id, title, description} = req.body;
    
//     await prisma.user.update({
//         where: {
//             id: Number(postId)
//         },
//         data: {
//             user_id: Number(user_id),
//             title,
//             description
//         }
//     })

//     return res.json({
//         status: 200, data: "post updated successfully"
//     })
// }

// export const deleteComment = async(req, res) => {
//     const commentId = req.params.id;
     
//     await prisma.post.update({
//         where: {
//             id: Number(post_id)
//         },
//         data: {
//             comment_count: {
//                 decrement: 1,
//             }
//         }
//     })




//     await prisma.comment.delete({
//         where: {
//             id: Number(commentId)
//         }

//     })

//     return res.json({status:200, message: "comment deleted successfully"})
// }