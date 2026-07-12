export const MESSAGE = {
  COMMON: {
    CREATED_SUCCESSFULLY: "Created successfully.",

    UPDATED_SUCCESSFULLY: "Updated successfully.",

    DELETED_SUCCESSFULLY: "Deleted successfully.",

    FETCHED_SUCCESSFULLY: "Data fetched successfully.",

    SAVED_SUCCESSFULLY: "Changes saved successfully.",

    OPERATION_SUCCESSFUL: "Operation completed successfully.",

    SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",

    NETWORK_ERROR: "Network error. Please check your connection.",

    UNAUTHORIZED: "You are not authorized to perform this action.",

    NOT_FOUND: "Requested resource not found.",
  },

  AUTH: {
    LOGIN_SUCCESS: "Login successful.",

    LOGOUT_SUCCESS: "Logout successful.",

    PROFILE_FETCH_SUCCESS: "Profile loaded successfully.",

    INVALID_CREDENTIALS: "Invalid email or password.",

    SESSION_EXPIRED: "Session expired. Please login again.",

    ACCESS_DENIED: "Access denied.",
  },

  HERO: {
    UPDATED: "Hero section updated successfully.",
  },

  ABOUT: {
    UPDATED: "About section updated successfully.",
  },

  SKILLS: {
    CREATED: "Skill created successfully.",

    UPDATED: "Skill updated successfully.",

    DELETED: "Skill deleted successfully.",
  },

  SERVICES: {
    CREATED: "Service created successfully.",

    UPDATED: "Service updated successfully.",

    DELETED: "Service deleted successfully.",
  },

  PROJECTS: {
    CREATED: "Project created successfully.",

    UPDATED: "Project updated successfully.",

    DELETED: "Project deleted successfully.",
  },

  BLOGS: {
    CREATED: "Blog created successfully.",

    UPDATED: "Blog updated successfully.",

    DELETED: "Blog deleted successfully.",
  },

  EXPERIENCE: {
    CREATED: "Experience created successfully.",

    UPDATED: "Experience updated successfully.",

    DELETED: "Experience deleted successfully.",
  },

  EDUCATION: {
    CREATED: "Education created successfully.",

    UPDATED: "Education updated successfully.",

    DELETED: "Education deleted successfully.",
  },

  CERTIFICATIONS: {
    CREATED: "Certification created successfully.",

    UPDATED: "Certification updated successfully.",

    DELETED: "Certification deleted successfully.",
  },

  TESTIMONIALS: {
    CREATED: "Testimonial created successfully.",

    UPDATED: "Testimonial updated successfully.",

    DELETED: "Testimonial deleted successfully.",
  },

  CONTACT: {
    MARKED_AS_READ: "Message marked as read.",

    DELETED: "Message deleted successfully.",
  },

  SETTINGS: {
    UPDATED: "Settings updated successfully.",
  },

  UPLOAD: {
    IMAGE_UPLOADED: "Image uploaded successfully.",

    FILE_UPLOADED: "File uploaded successfully.",

    FILE_REMOVED: "File removed successfully.",

    INVALID_FILE: "Invalid file selected.",

    FILE_TOO_LARGE: "File size exceeds the allowed limit.",
  },

  VALIDATION: {
    REQUIRED: "This field is required.",

    INVALID_EMAIL: "Please enter a valid email address.",

    INVALID_URL: "Please enter a valid URL.",

    INVALID_PHONE: "Please enter a valid phone number.",

    PASSWORD_MIN: "Password must be at least 6 characters.",

    PASSWORD_MISMATCH: "Passwords do not match.",
  },
} as const;
