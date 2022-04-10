import React, { useEffect, useState, useMemo, useContext, useReducer } from 'react';

const initialLoginState = {
    isLoading: true,
    userID: null,
    userToken: null,
  };
  
  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'LOGGED_IN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userID: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userID: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userID: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };