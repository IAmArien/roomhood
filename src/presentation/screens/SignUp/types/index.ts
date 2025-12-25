/**
 * Property of Norman Palisoc (https://github.com/IAmArien)
 * Reuse as a whole or in part is prohibited without permission.
 */

import { LoginSSOType } from 'presentation/screens/Login/types';

export type SignUpProps = SignUpPrefilledInfo & {
  type: LoginSSOType;
};

export type SignUpPrefilledInfo = {
  emailAddress?: string;
  firstName?: string;
  lastName?: string;
};
