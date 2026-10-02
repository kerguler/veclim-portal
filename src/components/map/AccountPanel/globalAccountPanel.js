import AccountPanel from 'components/map/AccountPanel/AccountPanel';
import userIcon from 'assets/icons/map-page-right-menu/svg/user-32px.svg';

export const ACCOUNT_MENU_ITEM = {
  key: 'account_utility',
  label: 'Account',
  parent: 'menu_icon',
};

export const ACCOUNT_PANEL_MENU_ITEM = {
  key: 'account_utility_panel',
  parent: 'account_utility',
};

export const ACCOUNT_PANEL_DATA_ITEMS = [
  {
    key: 'account_utility',
    icon: userIcon,
  },
  {
    key: 'account_utility_panel',
    label: 'Account',
    forgetOpen: true,
    compactPanel: true,
    content: <AccountPanel />,
  },
];
