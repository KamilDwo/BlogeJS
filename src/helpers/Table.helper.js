import React from "react";
import { Link } from "react-router-dom";
import { StyledCol, StyledMoment } from "../styles/Styles.style";
import { Card, Row } from "antd";
import GetAvatar from "../helpers/Avatar.helper";

const { Meta } = Card;

const CreateTable = posts => {
  const { postsData } = posts;
  let rowContents = [],
    contents,
    stringKey,
    stringKey2;

  if (postsData) {
    contents = postsData.reduce((acc, p, i) => {
      const { postUser, postCreated, _id, postTitle, postIntro } = postsData[i];
      stringKey = `r${i}`;
      stringKey2 = `r2${i}`;

      rowContents.push(
        <Link to={`/post/${_id}`} key={i}>
          <StyledCol xl={8} lg={12} md={12}>
            <Card>
              <StyledMoment
                format="D MMM YYYY, HH:mm"
                withTitle
                tz="Europe/Warsaw"
              >
                {postCreated}
              </StyledMoment>
              <Meta
                avatar={<GetAvatar id={postUser} />}
                title={postTitle}
                description={postIntro}
              />
            </Card>
          </StyledCol>
        </Link>
      );

      if (i % 3 === 3) {
        acc.push(
          <Row gutter={16} key={stringKey}>
            {rowContents}
          </Row>
        );
        rowContents = [];
      }
      return acc;
    }, []);

    contents.push(
      <Row gutter={16} key={stringKey2}>
        {rowContents}
      </Row>
    );
    return <>{contents}</>;
  }
  return null;
};

export default CreateTable;
