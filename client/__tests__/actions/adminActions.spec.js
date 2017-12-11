import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import { mockStoreData } from '../__mocks__/mockData';
import { addBook,
  editBook,
  deleteBook,
  addBookCategory
} from '../../actions/adminActions/books';
import { fetchNotifications } from '../../actions/adminActions/notifications';
import actionTypes from '../../actions/actionTypes';
import uploadFile from '../../actions/uploadFile';
import notify from '../__mocks__/notify';


window.CLOUDINARY_API_BASE = 'CLOUDINARY_API_BASE';
window.CLOUDINARY_UPLOAD_PRESET = 'CLOUDINARY_UPLOAD_PRESET';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('ADMIN ACTIONS', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  describe('addBook', () => {
    it('returns a success toast on success', () => {
      moxios.stubRequest('/api/v1/books', {
        status: 200,
        response: { message: 'success' }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(addBook(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(notify.success).toHaveBeenCalled();
      });
    });

    it('toasts a message and creates no action on failure', () => {
      moxios.stubRequest('/api/v1/books', {
        status: 500,
        response: { message: 'failure' }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(addBook(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(notify.error).toHaveBeenCalled();
      });
    });
  });

  describe('editBook', () => {
    it('returns a success toast on success', () => {
      moxios.stubRequest('/api/v1/books/1', {
        status: 200,
        response: { message: 'success' }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(editBook(1, {})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(notify.success).toHaveBeenCalled();
      });
    });

    it('returns a success toast on failure', () => {
      moxios.stubRequest('/api/v1/books/1', {
        status: 500,
        response: { message: 'success' }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(editBook(1, {})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(notify.success).toHaveBeenCalled();
      });
    });
  });

  describe('deleteBook', () => {
    it('creates DELETE_BOOK on success', () => {
      moxios.stubRequest('/api/v1/books/1', {
        status: 200,
        response: { message: 'success' }
      });
      const expectedActions = [{ type: actionTypes.DELETE_BOOK, id: 1 }];
      const store = mockStore({});
      return store.dispatch(deleteBook(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(notify.success).toHaveBeenCalled();
      });
    });

    it('toasts a message and creates no action on failure', () => {
      moxios.stubRequest('/api/v1/books/1', {
        status: 500,
        response: { message: 'success' }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(deleteBook(1)).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(notify.error).toHaveBeenCalled();
      });
    });
  });

  describe('addBookCategory', () => {
    it('returns a success toast on success', () => {
      moxios.stubRequest('/api/v1/books/category', {
        status: 200,
        response: { message: 'success' }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(addBookCategory('category')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(notify.success).toHaveBeenCalled();
      });
    });

    it('toasts a message and creates no action on failure', () => {
      moxios.stubRequest('/api/v1/books/category', {
        status: 500,
        response: { message: 'failure' }
      });
      const expectedActions = [];
      const store = mockStore({});
      return store.dispatch(addBookCategory('category')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(notify.error).toHaveBeenCalled();
      });
    });
  });

  describe('fetchNotifications', () => {
    it('it creates IS_FETCHING_NOTIFICATIONS, GET_ADMIN_NOTIFICATIONS ' +
      'and SET_NOTICATIONS_PAGINATION when successful', () => {
      const { notifications } = mockStoreData.notificationReducer;
      const { pagination } = mockStoreData.notificationReducer;
      moxios.stubRequest('/api/v1/admin-notifications', {
        status: 200,
        response: { message: 'success', notifications, metadata: pagination }
      });
      const expectedActions = [
        { type: actionTypes.IS_FETCHING_NOTIFICATIONS, status: true },
        { type: actionTypes.SET_NOTICATIONS_PAGINATION, pagination },
        { type: actionTypes.GET_ADMIN_NOTIFICATIONS, notifications },
        { type: actionTypes.IS_FETCHING_NOTIFICATIONS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(fetchNotifications()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(notify.success).toHaveBeenCalled();
      });
    });

    it('it creates IS_FETCHING_NOTIFICATIONS, GET_MORE_ADMIN_NOTIFICATIONS ' +
      'and SET_NOTICATIONS_PAGINATION when successfully called with offset > 0',
    () => {
      const { notifications } = mockStoreData.notificationReducer;
      const { pagination } = mockStoreData.notificationReducer;
      moxios.stubRequest('/api/v1/admin-notifications?offset=20&', {
        status: 200,
        response: { message: 'success', notifications, metadata: pagination }
      });
      const expectedActions = [
        { type: actionTypes.IS_FETCHING_NOTIFICATIONS, status: true },
        { type: actionTypes.SET_NOTICATIONS_PAGINATION, pagination },
        { type: actionTypes.GET_MORE_ADMIN_NOTIFICATIONS, notifications },
        { type: actionTypes.IS_FETCHING_NOTIFICATIONS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(fetchNotifications({ offset: 20 })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(notify.success).toHaveBeenCalled();
      });
    });

    it('it creates IS_FETCHING_NOTIFICATIONS actions and sends an error ' +
      'notification with on failure', () => {
      const { notifications } = mockStoreData.notificationReducer;
      const { pagination } = mockStoreData.notificationReducer;
      moxios.stubRequest('/api/v1/admin-notifications', {
        status: 500,
        response: { message: 'failure', notifications, metadata: pagination }
      });
      const expectedActions = [
        { type: actionTypes.IS_FETCHING_NOTIFICATIONS, status: true },
        { type: actionTypes.IS_FETCHING_NOTIFICATIONS, status: false }
      ];
      const store = mockStore({});
      return store.dispatch(fetchNotifications()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(notify.success).toHaveBeenCalled();
      });
    });
  });

  describe('uploadFile', () => {
    it('handles file upload success', (done) => {
      const store = mockStore({});
      return store.dispatch(uploadFile('file')).then((response) => {
        expect(response.ok).toBe(true);
        expect(response.status()).toBe(200);
        expect(response.data.message).toBe('success');
        done();
      });
    });
  });
});
