import React from "react";
import { DataFeatureItem } from "@/lib/data-types";

interface ResumeDataItemProps {
  dataItem: DataFeatureItem;
}

const ResumeDataItem: React.FC<ResumeDataItemProps> = ({ dataItem }) => {
  // Helper function to handle multiple status conditions
  const getStatusBadgeClass = (status?: string) => {
    if (status === "Ongoing") {
      return "text-bg-primary";
    } else if (status === "Finished") {
      return "text-bg-success";
    } else {
      return "text-bg-secondary";
    }
  };

  return (
    <div className="resume-item">
      {/* You can access common properties directly */}
      <h3 className="fs-2 text-body-emphasis d-flex align-items-center gap-2 flex-wrap">
        <span>
          {dataItem.type === "education" && dataItem.location}
          {dataItem.type === "experience" && dataItem.title}
        </span>

        <span
          className={`badge fs-6 fw-medium ${getStatusBadgeClass(
            dataItem.status
          )}`}
        >
          {dataItem.status}
        </span>
      </h3>
      {dataItem.type === "education" && (
        <p className="mb-1">
          {dataItem.degree} {dataItem.major}
        </p>
      )}
      {dataItem.type === "experience" && (
        <p className="mb-1">{dataItem.location}</p>
      )}
      <p className="mb-1">
        <small className="text-body-secondary">
          {dataItem.start_period.getFullYear()} -{" "}
          {dataItem.finish_period
            ? dataItem.finish_period.getFullYear()
            : "Sekarang"}
        </small>
      </p>
      {dataItem.type === "education" && (
        <p className="mb-1">
          <strong>IPK:</strong> {dataItem.gpa}
        </p>
      )}

      {/* Use a type guard to access specific properties */}
      {/* {dataItem.type === "education" && (
        <ul>
          <li>Degree: {dataItem.degree}</li>
          <li>Major: {dataItem.major}</li>
          {dataItem.gpa && <li>GPA: {dataItem.gpa}</li>}
        </ul>
      )}

      {dataItem.type === "experience" && (
        <ul>
          <li>Title: {dataItem.title}</li>
        </ul>
      )}

      {dataItem.description && <p>{dataItem.description}</p>} */}
    </div>
  );
};

export default ResumeDataItem;
