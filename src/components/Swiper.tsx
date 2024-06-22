import Carousel from "react-multi-carousel";
import styles from "../pages/HomePageStyles.module.css";
import { HeartOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { useEffect } from "react";
import Push from "push.js";
import { Link } from "react-router-dom";
import testImage from "../assets/test.jpg";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};
let faveList = [];
const Swiper = ({ header, data = [], handleFavList }) => {
  useEffect(() => {
    faveList = JSON.parse(localStorage.getItem("favList")!) || [];
  }, [faveList]);

  const handleAddFav = (data) => {
    const faves: any = JSON.parse(localStorage.getItem("favList")!) || [];
    const repeated = faves.findIndex((item) => item.id == data.id);
    if (repeated !== -1) {
      faves.splice(repeated, 1);
      localStorage.setItem("favList", JSON.stringify(faves));
      faveList = JSON.parse(localStorage.getItem("favList")!) || [];
      handleFavList(JSON.parse(localStorage.getItem("favList")!) || []);
      return;
    }
    if (faves.lenght) {
    } else {
      faves.push({
        original_title: data.title,
        releasTime: data.release_date,
        id: data.id,
        backdrop_path: data.backdrop_path,
        isSentNotif: false,
      });
      localStorage.setItem("favList", JSON.stringify(faves));
      faveList = JSON.parse(localStorage.getItem("favList")!) || [];
      handleFavList(JSON.parse(localStorage.getItem("favList")!) || []);
    }
  };

  function daysUntil(targetDateStr, movieName, id, status) {
    const targetDate = new Date(targetDateStr);
    const today = new Date();
    const timeDiff = targetDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (daysLeft > 0) {
      return `${daysLeft} days left`;
    } else if (daysLeft === 0) {
      return "Released today!";
    } else {
      if (!status) {
        Push.create(`${movieName}`, {
          body: "Has Been Released!",
          icon: "../assets/movie.svg",
          timeout: 10000,
          onClick: function () {
            faveList.map((item, index) => {
              if (item.id == id) {
                faveList[index]["isSentNotif"] = true;
              }
              localStorage.setItem("favList", JSON.stringify(faveList));
            });
            // console.log("inside released", faveList);
          },
        });
      }

      return "Released";
    }
  }

  return (
    <>
      <h3 className={styles.header}>{header}</h3>
      <Carousel
        className={styles.swipper}
        responsive={responsive}
        swipeable={true}
        draggable={true}
      >
        {data?.map((item) => (
          <Link key={item.id} to={`/Movie-Detail/${item.id}`}>
            <Card className={styles.container}>
              <div className={styles.swiperImage}>
                <img
                  className={styles.image}
                  src={`http://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
                  alt=""
                />
              </div>
              <p className={styles.movieName}>{item.original_title}</p>
              {header == "Waitng For" && (
                <div className={styles.timer}>
                  {daysUntil(
                    item.release_date,
                    item.original_title,
                    item.id,
                    item.isSentNotif
                  )}
                </div>
              )}
              <Button
                danger={faveList?.some((el) => el.id === item.id)}
                type="primary"
                shape="circle"
                icon={<HeartOutlined />}
                size={"large"}
                className={styles.favBtn}
                onClick={() => {
                  handleAddFav(item);
                }}
              />
            </Card>
          </Link>
        ))}
      </Carousel>
    </>
  );
};

export default Swiper;
