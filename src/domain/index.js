import * as actions from './actions';
import * as components from './components';
import * as models from './models';
import reducer from './reducer';

export const NAME = 'domain';
export const Domains = components.DomainsContainer;
export const Domain  = components.DomainContainer;
export const createDomain = actions.createDomain;

export default { actions, components, models, reducer, NAME };
