import React, { useEffect, useState } from 'react';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [modalData, setModalData] = useState({ index: null, isEdit: false, user: {} });
  const [modalVisible, setModalVisible] = useState(false);
  const fetchUsers = async () => {
    try {
      const response = await fetch('https://677d4c274496848554c9fb47.mockapi.io/userinfo');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://677d4c274496848554c9fb47.mockapi.io/userinfo/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        fetchUsers();
        closeModal();
      } 
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleEdit = async (id, updatedUser) => {
    try {
      const response = await fetch(`https://677d4c274496848554c9fb47.mockapi.io/userinfo/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
      });

      if (response.ok) {
        fetchUsers();
        closeModal();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const openModal = (index, isEdit) => {
    setModalVisible(true);
    setModalData({
      index,
      isEdit,
      user: isEdit ? users[index] : {}
    });
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalData({ index: null, isEdit: false, user: {} });
  };
  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [name]: value
      }
    }));
  };
  return (
    <div className="list-container">
      {users.map((user, index) => (
        <div key={user.id} className="user-item">
          <div className='userinfo'><p className="label">:نام</p><p className="value">{user.name} {user.familyName}</p></div>
          <div className='userinfo'><p className="label">:شماره موبایل</p><p className="value">{user.phoneNumber}</p></div>
          <div className='userinfo'><p className="label">:نسبت</p><p className="value">{user.relationship}</p></div>
          <div className='userinfo'><p className="label">:ایمیل</p><p className="value">{user.email}</p></div>
          <button onClick={() => openModal(index, true)} className="btn edit-btn">ویرایش</button>
          <button onClick={() => openModal(index, false)} className="btn delete-btn">حذف</button>
        </div>
      ))}
      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-container">
            {modalData.isEdit ? (
              <div>
                <h2 className="modal-title">ویرایش اطلاعات کاربر</h2>
                <form onSubmit={(e) => { e.preventDefault(); handleEdit(users[modalData.index].id, modalData.user); }}>
                  <div className="form-group">
                    <label>نام</label>
                    <input
                      type="text"
                      name="name"
                      value={modalData.user.name || ''}
                      onChange={handleModalChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>نام خانوادگی</label>
                    <input
                      type="text"
                      name="familyName"
                      value={modalData.user.familyName || ''}
                      onChange={handleModalChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>شماره</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={modalData.user.phoneNumber || ''}
                      onChange={handleModalChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>نسبت</label>
                    <input
                      type="text"
                      name="relationship"
                      value={modalData.user.relationship || ''}
                      onChange={handleModalChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>ایمیل</label>
                    <input
                      type="email"
                      name="email"
                      value={modalData.user.email || ''}
                      onChange={handleModalChange}
                      className="input-field"
                      required
                    />
                  </div>
                  <button type="submit" className="btn yes-btn">تایید</button>
                  <button type="button" onClick={closeModal} className="btn cancel-btn">لغو</button>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="modal-title">آیا مطمئن هستید که می‌خواهید حذف کنید؟</h2>
                <button onClick={() => handleDelete(users[modalData.index].id)} className="btn delete-btn">تایید</button>
                <button onClick={closeModal} className="btn cancel-btn">لغو</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
