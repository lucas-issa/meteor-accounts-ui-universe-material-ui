

export const AccountsUiConfig = {
    onLogin: null,
    onCancel: () => {
        window.history.back();
    },
    onResetPasswordEmailSent: null,
};