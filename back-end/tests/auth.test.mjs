import { expect } from 'chai';
import * as auth from '../src/auth.mjs';

describe('User Authentication', () => {
    beforeEach(() => {
        auth.clearUsers();
      });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const user = await auth.register('testUser', 'test@example.com', 'password123');
      expect(user).to.have.property('username', 'testUser');
      expect(user).to.have.property('email', 'test@example.com');
      expect(user).to.have.property('password').that.is.a('string');
    });

    it('should throw an error if the username is less than 8 characters', async () => {
      try {
        await auth.register('short', 'test@example.com', 'password123');
      } catch (error) {
        expect(error.message).to.equal('USERNAME/PASSWORD TOO SHORT');
      }
    });

    it('should throw an error if the password is less than 8 characters', async () => {
      try {
        await auth.register('testUser', 'test@example.com', 'short');
      } catch (error) {
        expect(error.message).to.equal('USERNAME/PASSWORD TOO SHORT');
      }
    });

    it('should throw an error if the username already exists', async () => {
      await auth.register('testUser', 'test@example.com', 'password123');
      try {
        await auth.register('testUser', 'test2@example.com', 'password123');
      } catch (error) {
        expect(error.message).to.equal('USERNAME ALREADY EXISTS');
      }
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await auth.register('testUser', 'test@example.com', 'password123');
    });

    it('should login successfully with correct credentials', async () => {
      const user = await auth.login('testUser', 'password123');
      expect(user).to.have.property('username', 'testUser');
      expect(user).to.have.property('email', 'test@example.com');
    });

    it('should throw an error if the username is not found', async () => {
      try {
        await auth.login('nonExistentUser', 'password123');
      } catch (error) {
        expect(error.message).to.equal('USER NOT FOUND');
      }
    });

    it('should throw an error if the password is incorrect', async () => {
      try {
        await auth.login('testUser', 'wrongPassword');
      } catch (error) {
        expect(error.message).to.equal('PASSWORDS DO NOT MATCH');
      }
    });
  });
});
