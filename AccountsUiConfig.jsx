export const AccountsUiConfig = {
    onExplicitLogin: null,
    onGoToLoggedInHome: null,
    onCancel: () => {
        window.history.back();
    },
    onResetPasswordEmailSent: null,
    backgroundImageUrl: null,
};