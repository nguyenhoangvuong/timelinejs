import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Timeline from "timelinejs-react";
import { PostModel } from "../../models/export";
import { PostServices } from "../../services/export";
import { postActions } from "../../store/actions/export";
import { useAppDispatch } from "../../store/app/hooks";
import { CategoryState, PostState } from "../../store/slice/export";
import { PostToTilteSlideMapping } from "../../utils/mapping";

type Props = {
  categoryState: CategoryState;
  postState: PostState;
};

const PostDetailComponent: React.FC<Props> = (props) => {
  let navigate = useNavigate();
  let { postState, categoryState } = props;
  const dispatch = useAppDispatch();
  let listPost = document.querySelectorAll(".tl-slide");
  let allPost = postState.listAllPost;
  let events: TitleSlide[] = [];
  let userId = localStorage.getItem("USER_ID");

  let url = useParams();

  function initialData() {
    allPost?.forEach((post: PostModel) => {
      let tileSlide = PostToTilteSlideMapping(post);
      events.push(tileSlide);
    });
  }

  // inital data for timeline
  initialData();
  window.onload = () => {
    listPost = document.querySelectorAll(".tl-slide");
  };

  
  let isSubcate = false;
  // const [isCheck, setIsCheck] = useState(false);
  // useEffect(() => {
  //   if (listPost.length > 0) {
  //     listPost.forEach((item) =>
  //       item.addEventListener("click", () => {
  //         PostServices.getPostByID(
  //           String(item.getAttribute("id")),
  //           String(userId)
  //         )
  //           .then(async (res) => {
  //             let response: PostModel = await res.data.Data;
  //             console.log(response);
              
  //             // dispatch(postActions.setPostSelected(response));
  //             // navigate(`/${response.PostUrl}`);
  //             setIsCheck(!isCheck);
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });
  //       })
  //     );
  //   }
  // }, [listPost]);
  useEffect(() => {
    let myInterval = setInterval(displayHello, 1000);
    function displayHello() {
      listPost = document.querySelectorAll(".tl-slide");
      if (listPost.length > 0) {
        listPost.forEach((item) => {
          item.addEventListener("click", () => {
            if (item) {
              let id = item.getAttribute("id");
              PostServices.getPostByID(String(id), String(userId))
                .then(async (res) => {
                  // dispatch(postActions.setContent(await res.data.Data.Content));
                  let response: PostModel = await res.data.Data;
                  dispatch(postActions.setPostSelected(response));
                  navigate(`/${response.PostUrl}`);
                })
                .catch((error) => {
                  console.log(error);
                });
            }
            // console.log("item", item.getAttribute("id"));
          });
        });
        clearInterval(myInterval);
      }
    }
    setTimeout(() => clearInterval(myInterval), 1000);
  }, [events]);

  return (
    <>
      {events.length > 0 ? (
        <div style={{ height: "45vh" }}>
          <Timeline
            target={
              <div
                className="timeline-test"
                style={{ width: "100%", height: 500 }}
              />
            }
            events={events}
            options={{
              timenav_position: "top",
              hash_bookmark: true,
              initial_zoom: 1,
              scale_factor: 1,
              debug: true,
              default_bg_color: { r: 0, g: 0, b: 0 },
            }} // optional
          />
        </div>
      ) : (events.length  === 0)? (
        <div
          className="w-100 h-100 d-flex justify-content-center align-items-center fs-1 loading"
          style={{ height: "100vh" }}
        >
          No Post
        </div>
      ) : (
        <div
          className="w-100 h-100 d-flex justify-content-center align-items-center fs-1 loading"
          style={{ height: "100vh" }}
        >
          Loading...
        </div>
      )}
    </>
  );
};

export default PostDetailComponent;
