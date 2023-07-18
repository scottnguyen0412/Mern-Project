import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { reducers } from "./redux/reducers";
import './index.css'


// const store: đối tượng store của Redux, lưu trữ trạng thái của ứng dụng và cho phép bạn truy xuất và cập nhật trạng thái đó.
// createStore(reducers, compose(applyMiddleware(thunk))):
// - reducers xử lý các action và trả về state mới
// - compose(applyMiddleware(thunk)): compose() cho phép kết hợp nhiều middleware lại với nhau,
//   applyMiddleware(thunk) để xử lý các action bất đồng bộ.
const store = createStore(reducers, compose(applyMiddleware(thunk)))
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
