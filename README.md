# Accounts UI with Material UI and Universe (i18n)

A replacement for `accounts-ui` to use with [React](https://facebook.github.io/react/), [Material UI](http://www.material-ui.com) and [Universe i18n](https://atmospherejs.com/universe/i18n).
It is a clone from https://atmospherejs.com/universe/accounts-ui and changed to use Material UI.

## Installation

    meteor add lucasissa:meteor-accounts-ui-universe-material-ui

- This package assumes that you're using React.
- This package uses Material UI.
    * `meteor npm install material-ui`

- Login options will show based on installed packages and you need to add them manually, e.g.
    * `meteor add accounts-password accounts-facebook ...`

## Usage

- You need to set up own routes
- Place `accounts-ui` components where you wish to render forms

Basic usage could look like:

    import {ComboBox} from 'meteor/lucasissa:meteor-accounts-ui-universe-material-ui';

    Router.route('/login', {
        name: 'login',
        action () {
            mount(Layout, {
                content: <ComboBox />
            });
        }
    });

### Available components

- `LoginBox` - simple login form
- `RegisterBox` - simple register form
- `ComboBox` - both above forms combined into one
- `ResetPasswordBox` - password reset form
- `EnrollmentBox` - password init form

## Configuration

For now there is only one configuration. A callback for a successful login. Example:

```javascript
import {AccountsUiConfig} from 'meteor/lucasissa:meteor-accounts-ui-universe-material-ui/AccountsUiConfig';

AccountsUiConfig.onLogin = () => {
    FlowRouter.go('/');
};
```

    
## Know issues

- Has UI for password reset, but don't provide server-side functionality yet. 
However EnrollmentBox can be used to provide the UI to inform the new password to complete the password reset.
- You need to set ServiceConfiguration options for external services on your own, no forms yet

## Examples

### General e-mail setup

```javascript

// On the server:

Accounts.emailTemplates.siteName = 'Xxxxx';
Accounts.emailTemplates.from = 'Xxxx <xxx@xxx.xxx>';
// ...

```


### EnrollmentBox

```javascript

// On the server:

// Configures "enroll account" email link
Accounts.urls.enrollAccount = (token) => {
    let url = Meteor.absoluteUrl("enroll-account/" + token);
    return url;
};

```

```javascript

// On the client:

import {EnrollmentBox} from 'meteor/lucasissa:meteor-accounts-ui-universe-material-ui';


FlowRouter.route("/enroll-account/:token", {
    name: "EnrollAccount",
    action({token, done}) {

        const onComplete = () => {
            done();
            FlowRouter.go('/');
        };

        mount(Layout, {
            content: (<EnrollmentBox token={token} onComplete={onComplete} />)
        });
    }
});

```

or 

```javascript
import {EnrollmentBox} from 'meteor/lucasissa:meteor-accounts-ui-universe-material-ui';

Accounts.onEnrollmentLink((token, done) => {
    Meteor.setTimeout(() => { // to mount after FlowRouter (you can also use Accounts.urls.enrollAccount)
        const onComplete = () => {
            done();
            FlowRouter.go('/');
        };
        mount(MainLayout, {
            content: <EnrollmentBox token={token} onComplete={onComplete} />
        });
    }, 100);
});
```

The last one did not work with me, but it was in the original cloned repository.

### ResetPasswordBox

```javascript

// On the server:

// Configures "reset password account" email link
Accounts.urls.resetPassword = (token) => {
    return Meteor.absoluteUrl("reset-password/" + token);
};

```

```javascript

// On the client:

import {EnrollmentBox} from 'meteor/lucasissa:meteor-accounts-ui-universe-material-ui';

const requestResetPassword = '/send-reset-password';

FlowRouter.route("/login", {
    name: "Login",
    action() {
        mount(Layout, {
            content: (<LoginBox resetLink={requestResetPassword} />)
        });
    }
});

FlowRouter.route(requestResetPassword, {
    name: "SendResetPassword",
    action() {
        mount(Layout, {
            content: (<ResetPasswordBox />)
        });
    }
});

FlowRouter.route("/reset-password/:token", {
    name: "ResetPassword",
    action({token, done}) {

        const onComplete = () => {
            // done();
            FlowRouter.go('/');
        };

        mount(Layout, {
            content: (<EnrollmentBox token={token} onComplete={onComplete} />)
        });
    }
});

```
