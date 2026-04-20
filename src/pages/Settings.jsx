import "../css/Settings.css"

function Settings(){
    return(
        <div className="settings-page">
            <div className="settings-header">
                <h1>Settings</h1>
                <p>Here you can customize your experience and manage your account settings.
                    You can update your profile information, change your password, and configure notification preferences.
                </p>
            </div>
            <div className="settings-content">
                <div className="setting-option">
                    <h2>Profile Information</h2>
                    <p>Update your name, email, and other personal details.</p>
                </div>
                <div className="setting-option">
                    <h2>Password</h2>   
                    <p>Change your account password to keep your information secure.</p>
                </div>
                <div className="setting-option">
                    <h2>Notification Preferences</h2>
                    <p>Manage how you receive updates and notifications about your job applications.</p>
                </div>
                <div className="setting-option">
                    <h2>Data Export</h2>
                    <p>Export your job application data for backup or analysis.</p>
                </div>
                <div className="setting-option">
                    <h2>Theme Preferences</h2>
                    <p>Customize the appearance of the application with light and dark mode options.</p>
                </div>
                <div className="setting-option">
                    <h2>Account Deletion</h2>
                    <p>Delete your account and all associated data permanently.</p>
                </div>
            </div>
        </div>
    )
}
export default Settings;