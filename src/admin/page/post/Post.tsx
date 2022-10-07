import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import {
  CategoryServices,
  CommentServices,
  PostServices,
} from "../../../services/export";
import {
  CategoryModel,
  PostModel,
  ResponseDataType,
} from "../../../models/export";
import {
  adminActions,
  commentActions,
  postActions,
} from "../../../store/actions/export";
import { useAppDispatch } from "../../../store/app/hooks";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

var $ = require("jquery");

type Props = {
  globalState: any;
};

const Post: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  const [isCheck, setIsCheck] = useState(false);
  const [allSubCate, setAllSubCate] = useState<any>();
  const [subSelected, setSubSelected] = useState("");
  const [listAllPost, setListAllPost] = useState<any>([]);
  const [listAllPostBonus, setListAllPostBonus] = useState<any>([]);

  $(document).ready(function () {
    if(listAllPost.length > 0) {
    $("#post").DataTable();
    $("#category").DataTable();
    }
  });

  useEffect(() => {
    CategoryServices.getAllSubCate().then(async (res) => {
      let response: ResponseDataType = await res.data;
      setAllSubCate(response.Data);
    });

    PostServices.getAllPostBySubCateID(subSelected, 0)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        // setListAllPostBonus(
        //   // response.Data.filter(
        //   //   (item: any) => item.PostCategoryId === subSelected
        //   // )
        //   response.Data
        // );
        setListAllPost(response.Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isCheck, subSelected]);
  // }, [isCheck, subSelected]);

  // useEffect(() => {
  //   $("#category").DataTable();
  // }, [listAllPostBonus]);

  function handleRemove(id: string) {
    PostServices.deletePost(id)
      .then(async (res) => {
        let response: ResponseDataType = await res.data;
        if (response.Code === 200) {
          toast.success(response.Message.Message);
        } else {
          toast.error(response.Message.Message);
        }
        setIsCheck(!isCheck);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEdit(post: PostModel) {
    dispatch(adminActions.setUpdatePost(post));
  }

  function handleAddNew() {
    dispatch(adminActions.setUpdatePost(new PostModel()));
  }

  function handleErrorImg(e: any) {
    e.target.src = "/assets/image/no-image.png";
  }

  function handleChangeSelectSub(e: any) {
    console.log('handleChangeSelectSub', e.target.value);
    
    setSubSelected(e.target.value);
  }

  return (
    <>
      <div className="d-flex flex-column w-100 position-relative">
        {listAllPost.length > 0 ? (
          <>
            <div>
              <NavLink
                to="/admin/post/add-post"
                type="button"
                className="btn btn-primary w-auto btn-add"
                onClick={handleAddNew}
              >
                <i className="fa fa-plus pr-2"></i> Add New
              </NavLink>
              {allSubCate && (
                <select
                  name="sub_post"
                  value={subSelected}
                  id=""
                  className="select-subcate"
                  onChange={(e) => handleChangeSelectSub(e)}
                >
                  <option value="">All Sub Category</option>
                  {allSubCate.map((item: CategoryModel) => (
                    <option key={"sub_post_" + item._id} value={item._id}>
                      {item.Name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <>
              {listAllPost.length >= 0 ? (
                <table
                  id="category"
                  className="table table-striped table-bordered"
                  style={{ width: "100%", height: "90%" }}
                >
                  <thead>
                    <tr>
                      <th style={{ width: "10%" }}>Image</th>
                      <th style={{ width: "10%" }}>Title</th>
                      <th>Description</th>
                      <th style={{ width: "10%" }}>URL</th>
                      <th style={{ width: "10%" }}>DateCreated</th>
                      <th style={{ width: "5%" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listAllPost?.map((post: PostModel) => {
                      if (subSelected === "") {
                        return (
                          <tr key={"list-post_" + post._id}>
                            <td>
                              <img
                                src={post["Image"]}
                                style={{ maxWidth: "100px" }}
                                alt="img"
                                className="rounded-1"
                                onError={(e) => handleErrorImg(e)}
                              />
                            </td>
                            <td>{post.Title}</td>
                            <td>{post.Description}</td>
                            <td>
                              <a
                                href={"../" + post.PostUrl}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Xem bài viết
                              </a>
                            </td>
                            <td>{post.DateCreated}</td>
                            <td className="text-center">
                              <NavLink
                                to={"/admin/post/comment/" + post._id}
                                state={{
                                  postId: post._id,
                                  postTitle: post.Title,
                                }}
                              >
                                <i className="icon-hover fa-solid fa-comment pr-2"></i>
                              </NavLink>
                              <NavLink
                                to={"/admin/post/edit-post/" + post._id}
                                onClick={() => handleEdit(post)}
                              >
                                <i className="icon-hover fa-solid fa-pen-to-square pr-2"></i>
                              </NavLink>
                              <i
                                className="icon-hover fa-solid fa-trash-can"
                                onClick={() => handleRemove(post._id)}
                              ></i>
                            </td>
                          </tr>
                        );
                      } else {
                        if (post.PostCategoryId === subSelected) {
                          return (
                            <tr key={"list-post_" + post._id}>
                              <td>
                                <img
                                  src={post["Image"]}
                                  style={{ maxWidth: "100px" }}
                                  alt="img"
                                  className="rounded-1"
                                  onError={(e) => handleErrorImg(e)}
                                />
                              </td>
                              <td>{post.Title}</td>
                              <td>{post.Description}</td>
                              <td>
                                <a
                                  href={"../" + post.PostUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  Xem bài viết
                                </a>
                              </td>
                              <td>{post.DateCreated}</td>
                              <td className="text-center">
                                <NavLink
                                  to={"/admin/post/comment/" + post._id}
                                  state={{
                                    postId: post._id,
                                    postTitle: post.Title,
                                  }}
                                >
                                  <i className="icon-hover fa-solid fa-comment pr-2"></i>
                                </NavLink>
                                <NavLink
                                  to={"/admin/post/edit-post/" + post._id}
                                  onClick={() => handleEdit(post)}
                                >
                                  <i className="icon-hover fa-solid fa-pen-to-square pr-2"></i>
                                </NavLink>
                                <i
                                  className="icon-hover fa-solid fa-trash-can"
                                  onClick={() => handleRemove(post._id)}
                                ></i>
                              </td>
                            </tr>
                          );
                        } else {
                          return (
                            <tr>
                              <td>Loading...</td>
                            </tr>
                          );
                        }
                      }
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th>Image</th>
                      <th style={{ width: "10%" }}>Title</th>
                      <th>Description</th>
                      <th style={{ width: "10%" }}>URL</th>
                      <th style={{ width: "10%" }}>DateCreated</th>
                      <th style={{ width: "5%" }}>Actions</th>
                    </tr>
                  </tfoot>
                </table>
              ) : (
                <span>No Post</span>
              )}
            </>
          </>
        ) : (
          <span>Hết</span>
        )}
      </div>
    </>
  );
};

export default Post;
