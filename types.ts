import {StyleProp} from 'react-native';

export type CommonComponentProps = {
  style?: StyleProp<any>;
};

export interface HttpService<GS = any, GB = any, P = any, D = any> {
  get?: () => Promise<GS>;
  getBatch?: () => Promise<GB>;
  post?: (args: any) => Promise<P>;
  delete?: () => Promise<D>;
}
