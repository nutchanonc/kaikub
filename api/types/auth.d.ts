interface PrivateAuthMiddleWare {
  success: boolean;
  payload?: {
    uid: string;
    token_type: string;
  };
  error?: any;
}

interface AuthMiddleWare {
  success: boolean;
  session?: Session;
  error?: any;
}
