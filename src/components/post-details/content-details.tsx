import parse from "html-react-parser";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostModel, ResponseDataType } from "../../models/export";
import { CommentServices } from "../../services/export";
import { commentActions } from "../../store/actions/export";
import { useAppDispatch } from "../../store/app/hooks";
import { RootState } from "../../store/app/store";
import { PostState } from "../../store/slice/export";
import "../../style/contentPostDetail.css";
import { NONE } from "../../utils/constants";
import { CommentComponent } from "../export";
type Props = {
  postState: PostState;
  globalState: RootState
};

export const ContentDetailComponent: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();
  let { postState, globalState } = props;
  let post: PostModel = postState.postSelected;
  let content = post.Content;
  let listComment = globalState.comment.listComment;
  

  let url = useParams()
  // if (content === NONE) {
  //   return null;
  // }

  useEffect(() => {
    getListComment();
  }, []);

  function getListComment(pageNumber: number = 0) {
    CommentServices.getCommentByPostID(post._id, pageNumber)
    .then(async (res) => {
      let response: ResponseDataType = await res.data;
      dispatch(commentActions.setListComment(response.Data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      {content !== NONE && url.postName ? (
        <p className="content position-relative opacity-100">
          <div className="ml-auto w-25 text-right">
            <button className="btn btn-post-vote">
              <span>
                <svg
                  width="1em"
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M2 9h3v12H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zm5.293-1.293l6.4-6.4a.5.5 0 0 1 .654-.047l.853.64a1.5 1.5 0 0 1 .553 1.57L14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H8a1 1 0 0 1-1-1V8.414a1 1 0 0 1 .293-.707z"></path>
                  </g>
                </svg>
              </span>
              <span style={{ fontSize: "12px", fontWeight: "unset" }}>
                {post.QuantityLike} Like
              </span>
            </button>
          </div>
          <div>{parse(content)}</div>
          {/* social */}
          <div className="post-footer post-footer--rada mt-4">
            <div className="d-flex flex-column">
              <div className="d-flex">
                <img
                  className="mr-2"
                  width="30"
                  height="30"
                  src="./assets/image/rada-animate.svg"
                  alt="logo"
                ></img>
                <div className="d-flex flex-column mt-1 mb-3">
                  <span className="logo--text">RADA</span>
                  <span className="post-footer--quote">
                    The DAO-based Angellist for Blockchain
                  </span>
                </div>
              </div>
              <div className="post-footer--social">
                <a href="#" className="btn-social brand--telegram btn-default">
                  <span>
                    <i className="fa-brands fa-telegram"></i>
                  </span>
                  <span>Announcement</span>
                </a>
                <a href="#" className="btn-social brand--telegram btn-default">
                  <span>
                    <i className="fa-brands fa-telegram"></i>
                  </span>
                  <span>Global Community</span>
                </a>{" "}
                <a href="#" className="btn-social brand--twitter btn-default">
                  <span>
                    <i className="fa-brands fa-twitter"></i>
                  </span>
                  <span>Twitter</span>
                </a>{" "}
                <a href="#" className="btn-social brand--facebook btn-default">
                  <span>
                    <i className="fa-brands fa-facebook"></i>
                  </span>
                  <span>Fanpage</span>
                </a>{" "}
                <a href="#" className="btn-social brand--facebook btn-default">
                  <span>
                    <i className="fa-brands fa-facebook"></i>
                  </span>
                  <span>Vietnam Community</span>
                </a>{" "}
                <a href="#" className="btn-social brand--youtube btn-default">
                  <span>
                    <i className="fa-brands fa-youtube"></i>
                  </span>
                  <span>RADA TV</span>
                </a>
                <a href="#" className="btn-social brand--instagram btn-default">
                  <span>
                    <i className="fa-brands fa-instagram"></i>
                  </span>
                  <span>Instagram</span>
                </a>
                <a href="#" className="btn-social brand--tiktok btn-default">
                  <span>
                    <i className="fa-brands fa-tiktok"></i>
                  </span>
                  <span>tiktok</span>
                </a>
              </div>
            </div>
          </div>

          {/* comment */}
          <CommentComponent
            postID={post._id}
            listComment={listComment}
            getListComment={getListComment}
          />
        </p>
      ) : (
        <div className="content position-relative opacity-100 text-center w-100 opacity-75">
          Select article to see details
        </div>
      )}
    </>
  );
};
