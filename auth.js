/**
 * Auth Service
 * Handles simple user registration and login using localStorage.
 * Security Note: This is a client-side mockup. storing passwords in localStorage is not secure for production.
 */
class AuthService {
    constructor() {
        this.usersKey = 'anyway_users';
        this.sessionKey = 'anyway_current_user';
    }

    getUsers() {
        const stored = localStorage.getItem(this.usersKey);
        return stored ? JSON.parse(stored) : [];
    }

    saveUsers(users) {
        localStorage.setItem(this.usersKey, JSON.stringify(users));
    }

    getCurrentUser() {
        const stored = localStorage.getItem(this.sessionKey);
        return stored ? JSON.parse(stored) : null;
    }

    register(name, email, password) {
        const users = this.getUsers();

        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Bu e-posta adresi zaten kayıtlı.' };
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // In real app: Hash this!
            favorites: [],
            verified: false, // verification required
            joined: new Date().toISOString()
        };

        users.push(newUser);
        this.saveUsers(users);

        // Return success but REQUIRE verification (don't auto login)
        return { success: true, requiresVerification: true, email: email };
    }

    verifyUser(email) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email);
        if (user) {
            user.verified = true;
            this.saveUsers(users);

            // Auto login after verification
            this.login(user.email, user.password); // Note: In real app we wouldn't have password here
            return true;
        }
        return false;
    }

    login(email, password) {
        const users = this.getUsers();
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            if (!user.verified) {
                return { success: false, message: 'Lütfen e-posta adresinizi doğrulayın. Kutunuzu kontrol edin.' };
            }

            // Create session
            const sessionUser = { ...user };
            delete sessionUser.password;
            localStorage.setItem(this.sessionKey, JSON.stringify(sessionUser));
            return { success: true, user: sessionUser };
        }

        return { success: false, message: 'Hatalı e-posta veya şifre.' };
    }

    logout() {
        localStorage.removeItem(this.sessionKey);
        window.location.href = 'index.html';
    }

    isLoggedIn() {
        return !!this.getCurrentUser();
    }

    updateUser(updatedData) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return false;

        const users = this.getUsers();
        const index = users.findIndex(u => u.id === currentUser.id);

        if (index > -1) {
            // Update main DB
            users[index] = { ...users[index], ...updatedData };
            this.saveUsers(users);

            // Update Session
            const newSession = { ...currentUser, ...updatedData };
            localStorage.setItem(this.sessionKey, JSON.stringify(newSession));
            localStorage.setItem(this.sessionKey, JSON.stringify(newSession));
            return true;
        }
        return false;
    }

    addOrder(order) {
        const currentUser = this.getCurrentUser();
        if (!currentUser) return false;

        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === currentUser.id);

        if (userIndex > -1) {
            // Init orders if missing
            if (!users[userIndex].orders) users[userIndex].orders = [];

            users[userIndex].orders.unshift(order); // Add to beginning
            this.saveUsers(users);

            // Update Session
            currentUser.orders = users[userIndex].orders;
            localStorage.setItem(this.sessionKey, JSON.stringify(currentUser));
            return true;
        }
        return false;
    }

    getOrders() {
        const user = this.getCurrentUser();
        return user ? (user.orders || []) : [];
    }
}

// Global Instance
window.authService = new AuthService();
