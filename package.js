Package.describe({
    name: 'lucasissa:meteor-accounts-ui-universe-material-ui',
    version: '0.5.0',
    summary: 'Accounts UI replacement for Universe using React and Material UI',
    documentation: 'README.md',
    git: 'https://github.com/lucas-issa/meteor-accounts-ui-universe-material-ui'
});

Package.onUse(function (api) {
    api.versionsFrom('1.3');

    api.use([
        'ecmascript',
        'universe:i18n@1.4.1',
        'react-meteor-data@0.2.4',
        'service-configuration',
        'accounts-base'
    ]);

    // Export Accounts (etc) to packages using this one.
    api.imply('accounts-base');

    // Allow us to call Accounts.oauth.serviceNames, if there are any OAuth services.
    // Allow us to directly test if accounts-password (which doesn't use Accounts.oauth.registerService) exists.
    api.use([
        'accounts-oauth',
        'accounts-password'
    ], {weak: true});

    api.addFiles([
        'utils.js',
        'components/ComboBox.jsx',
        'components/EnrollmentBox.jsx',
        'components/ErrorMessages.jsx',
        'components/LoggedIn.jsx',
        'components/LoginBox.jsx',
        'components/LoginForm.jsx',
        'components/OAuthButton.jsx',
        'components/PasswordForm.jsx',
        'components/RegisterBox.jsx',
        'components/RegisterForm.jsx',
        'components/ResetPasswordBox.jsx',
        'i18n/en.i18n.json',
        'i18n/pt.i18n.json',
        'i18n/ru.i18n.json',
    ]);
    api.mainModule('index.jsx');
});
