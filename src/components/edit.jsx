import { useUpdateMutation } from '../slices/usersApiSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../slices/authSlice';

const Edit = () => {
  const [usernom, setUsername] = useState('nonamed');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [edituser, { isLoading }] = useUpdateMutation();
  const { token } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(token);
      const res = await edituser({ token, usernom }).unwrap();
      //   ON APPELLE ICI AUSSI COMME DANS LA PAGE LOGIN LA FONCTION SETUSER POUR QUE LES INFOS PROFILES
      //   SOIENT UPDATEES DANS LE STATE ET LE LOCALSTORAGE AVEC LE NOUVEAU USERNAME
      dispatch(setUser({ ...res }));
      toast.success(`new username set to:${res.body.userName}`);
      navigate('/user');
      console.log(res.message);
      console.log(res.body.userName);
    } catch (err) {
      console.log('il ya une erreur non repertoriée');
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Change username</h1>
        <form onSubmit={submitHandler}>
          <div className="input-wrapper">
            <label htmlFor="usernom">New Username</label>
            <input
              type="text"
              id="usernom"
              name="usernom"
              value={usernom}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <button className="sign-in-button">
            {isLoading ? 'LOADING' : 'Choose'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Edit;