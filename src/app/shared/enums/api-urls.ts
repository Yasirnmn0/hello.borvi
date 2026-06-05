export enum ApiUrls {
  TOKEN = 'api/v1/Public/GetAuthToken',
  GET_ACTIVE_TOKEN = 'api/v1/user/GetActiveSession?userId={userId}',
  GET_LOGIN_USER_INFO = 'api/v1/user/GetInfoOfLoggedInUser',
  GET_LOOKUP_BY_TYPE = '/Lookup/LookupByType/{lookupType}',
  REFRESH_TOKEN = 'api/Login/refresh',
  USER_LOGIN = 'api/Login/login',
  LOGOUT = 'api/Login/logout',
  GET_SIDEMENU = 'api/Menu/my',
  GET_KPIS = 'api/Dashboard/kpis',
  GET_STATS = 'api/Dashboard/statistics',
  GET_SHOP_DETAILS = 'api/Dashboard/shops-detail',
  GET_SHOPS_DAILY_DETAIL = 'api/dashboard/ShopsDailyDetail',
  GET_SHOPS_HOURLY_DETAIL = 'api/dashboard/shops-hourly-detail',
  GET_SHOPS_COMPARISON = 'api/Dashboard/shops-compare',
  GET_SHOPS_CAM = 'api/live-cam/shops',
  GET_FLOORS_CAM = 'api/live-cam/floors-by-shop',
  GET_CAMS = 'api/live-cam/cameras',
  POST_CAM = 'api/live-cam/cameras',
  GET_ROLES = 'api/Role/search',
  ADD_ROLES = 'api/Role/add',
  DELETE_ROLES = 'api/Role/delete',
  EDIT_ROLES = 'api/Role/edit',
  GET_USERS = 'api/User/search',
  GET_SHOP_LIST = 'api/Shop/list-mine',
  ADD_USER = 'api/User/add',
  ADD_USER_SHOPS = 'api/User/add-with-shops',
  DELETE_USER = 'api/User/delete',
  EDIT_USER = 'api/User/edit',
  GET_SCREENS = 'api/Screen/list',
  GET_ROLES_ASSOCIATION = 'api/RightsMapping/search',
  ASSOCIATE_SCREENS = 'api/RightsMapping/add',
  GET_EMPLOYEES = 'api/Employee/search',
  DELETE_EMPLOYEE = 'api/Employee/delete',
  ADD_EMPLOYEE = 'api/Employee/add',
  EDIT_EMPLOYEE = 'api/Employee/edit',
  SEARCH_EMPLOUEE_BY_ID = 'api/Employee/detail', //edit 
  GET_SHOPS = 'api/shop/search',
  DELETE_SHOPS = 'api/shop',
  ADD_SHOPS = 'api/shop/add',
  EDIT_SHOPS = 'api/shop/edit',
  COMMON_DROPDOWN = 'api/common/dropdown',
  GET_FLOORS = 'api/Floor/by-shop',
  ADD_FLOORS = 'api/Floor/add',
  EDIT_FLOORS = 'api/Floor/edit',
  DELETE_FLOORS = 'api/floor/delete',
  //  API Configuration Endpoints 
  API_CONFIG_GET_MODULES = 'api/ApiConfig/modules',
  API_CONFIG_GET_ALL_CONFIGS = 'api/ApiConfig/configs',
  API_CONFIG_ADD_CONFIG = 'api/ApiConfig/configs',
  API_CONFIG_EDIT_CONFIG = 'api/ApiConfig/configs',
  API_CONFIG_DELETE_CONFIG = 'api/ApiConfig/configs',

  GET_ACTIVE_ROLE = 'api/role/activate',
  GET_ACTIVE_USER = 'api/user/activate',
  GET_ACTIVE_EMPLOYEE = 'api/employee/activate',
  GET_ACTIVE_SHOP = 'api/shop/activate',
  GET_ACTIVE_API_CONFIG = 'api/ApiConfig/configs', //patch method
  //Live Cam APIs
  GET_ASSIGN_SHOPS= 'api/footFall/shops', //Get the Assignes Shops for logged in user  
  GET_SHOPS_FLOORS= 'api/FootFall/floor-by-shop', //takeshopId as param e.g ?shopId=1
  CAMERA_CONFIGRATION = 'api/FootFall/camera-config', // This API takes entranceId which is Shop Floor ID, cameraURl, Coordinates
  GET_ENTERNECES = 'api/FootFall/entrances/by-floor',
  CAMERA_DOWNTIME_SEARCH = 'api/CameraDowntime/logs/search',
  CAMERA_DOWNTIME_LOGS_SEARCH = 'api/CameraDowntime/camera-status-logs/search',

  // Event APIs
  EVENT_TYPE_ADD = 'api/Event/event-type', // POST
  EVENT_TYPE_EDIT = 'api/Event/event-type', // PUT
  EVENT_TYPE_LIST = 'api/Event/event-types', // GET
  EVENT_TYPE_DELETE = 'api/Event/event-type', // DELETE


  EVENT_ADD = 'api/Event/configure-event', // POST
  EVENT_EDIT = 'api/Event/configure-event', // PUT
  EVENT_LIST = 'api/Event/configured-events', // GET
  /** GET ?eventId= returns { fromDate, toDate } for comparison mode */
  EVENT_DATE_RANGE = 'api/Event/event-date-range',
  EVENT_DROPDOWN = 'api/Event/dropdown',

  // Operating Hours APIs
  OPERATING_HOURS = 'api/OperatingHours',
  OPERATING_HOURS_BY_SHOP = 'api/OperatingHours/{shopId}/operating-hours',

  // Peak Hours / Threshold APIs
  THRESHOLD_CONFIG_SHOP = 'api/thresholds/shop/{shopId}',
  PEAK_DASHBOARD_DATA = 'api/dashboard/{shopId}',
  DASHBOARD_FULL = 'api/Dashboard/full',

  SALES_TRANSACTION_IMPORT = 'api/SalesTransaction/import',
  
    // Operating Hours APIs
  SAVE_FEEDBACK_FORM = 'api/Feedback/save',
  GET_FEEDBACK_FORMS = 'api/Feedback/getFeedback',
  GET_FEEDBACK_REPORT = 'api/Feedback/report',
  
  
  // FastAPI Qdrant
  FASTAPI_EMPLOYEE_UPLOAD = 'api/v1/upload',
  FASTAPI_EMPLOYEE_DELETE = 'api/v1/delete_employee',

  // Borvi Vendor APIs
  AUTH_LOGIN = 'api/Auth/login',
  AUTH_SEND_OTP = 'api/Auth/send-otp',
  AUTH_VERIFY_OTP = 'api/Auth/verify-otp',
  AUTH_COMPLETE_REGISTRATION = 'api/Auth/complete-registration',
  AUTH_COMPLETE_PROFILE = 'api/Auth/complete-profile',
  AUTH_UPDATE_BUSINESS = 'api/Auth/update-business',
  AUTH_SUBMIT_VERIFICATION = 'api/Auth/submit-verification',
  AUTH_VENDORS = 'api/Auth/vendors',
  AUTH_APPROVE_VENDOR = 'api/Auth/approve-vendor',
  AUTH_REJECT_VENDOR = 'api/Auth/reject-vendor',
  AUTH_ME = 'api/Auth/me',
  AUTH_REFRESH_TOKEN = 'api/Auth/refresh-token',
  AUTH_FORGOT_PASSWORD = 'api/Auth/forgot-password',
  AUTH_RESET_PASSWORD = 'api/Auth/reset-password',
  
  PRODUCTS_VENDOR = 'api/Products/vendor',
  PRODUCTS_VENDOR_STATS = 'api/Products/vendor-stats',
  PRODUCTS_ADD = 'api/Products',
}

