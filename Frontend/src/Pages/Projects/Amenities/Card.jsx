/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Card, Col, Row } from "antd";
import {
  CarOutlined,
  VideoCameraOutlined,
  SafetyOutlined,
  UpSquareOutlined,
} from "@ant-design/icons";

export const amenitiesList = [
  { name: "lift", label: "Lift", icon: <UpSquareOutlined /> },
  { name: "cctv", label: "24/7 CCTV", icon: <VideoCameraOutlined /> },
  { name: "parking", label: "Parking", icon: <CarOutlined /> },
  { name: "security", label: "Security", icon: <SafetyOutlined /> },
];

export const getAmenityDetails = (name) =>
  amenitiesList.find((a) => a.name === name) || {
    label: name,
    icon: null,
    name,
  };

const AmenitiesCards = ({ amenities }) => {
  return (
    <Row gutter={[8, 8]}>
      {amenities.map((amenity) => {
        const { label, icon } = getAmenityDetails(amenity);
        return (
          <Col key={amenity}>
            <Card
              size="small"
              style={{ textAlign: "center", width: 100 }}
              bodyStyle={{ padding: "8px" }}
            >
              {icon} <br />
              <span>{label}</span>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default AmenitiesCards;
