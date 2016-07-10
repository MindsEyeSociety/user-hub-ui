import * as actions from './actions';
import * as components from './components';
import * as models from './model';
import reducer from './reducer';

export const NAME = 'profile';
export const Profile = components.Profile;
export default { actions, components, models, reducer };
