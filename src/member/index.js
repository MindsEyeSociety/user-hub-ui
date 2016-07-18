import * as actions from './actions';
import * as components from './components';
import * as models from './models';
import * as selectors from './selectors';
import reducer from './reducer';

export const NAME = 'member';

export const Members = components.MembersContainer;
export const Member = components.MemberContainer;
export const MemberItem = components.MemberItem;

export default { actions, components, models, reducer, selectors, NAME };
