// HOW TO SET UP A reducer.ts FILE:
// Import actions and interfaces
// Create interface for initial state
// Create initial state
// Create reducer function and pass in initial state and actions.
// Return new state

import { VehicleActions, VehicleAction } from "../actions/vehicle.action";

export interface VehicleState {
  years: string[];
  makes: string[];
  models: string[];
  trims: string[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: VehicleState = {
  years: [],
  makes: [],
  models: [],
  trims: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: VehicleAction
): VehicleState {
  switch (action.type) {
    case VehicleActions.LOAD_YEARS: {
      return {
        ...state,
        loading: true
      };
    }
    case VehicleActions.LOAD_YEARS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case VehicleActions.LOAD_YEARS_SUCCESS: {
      return {
        ...state,
        years: action.payload.years,
        loaded: true,
        loading: false
      };
    }
    case VehicleActions.LOAD_MAKES: {
      return {
        ...state,
        loading: true
      };
    }
    case VehicleActions.LOAD_MAKES_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case VehicleActions.LOAD_MAKES_SUCCESS: {
      return {
        ...state,
        makes: action.payload.makes,
        loaded: true,
        loading: false
      };
    }
    case VehicleActions.LOAD_MODELS: {
      return {
        ...state,
        loading: true
      };
    }
    case VehicleActions.LOAD_MODELS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case VehicleActions.LOAD_MODELS_SUCCESS: {
      return {
        ...state,
        models: action.payload.models,
        loaded: true,
        loading: false
      };
    }
    case VehicleActions.LOAD_TRIMS: {
      return {
        ...state,
        loading: true
      };
    }
    case VehicleActions.LOAD_TRIMS_FAIL: {
      return {
        ...state,
        loaded: false,
        loading: false
      };
    }
    case VehicleActions.LOAD_TRIMS_SUCCESS: {
      return {
        ...state,
        trims: action.payload.trims,
        loaded: true,
        loading: false
      };
    }
  }

  return state;
}
