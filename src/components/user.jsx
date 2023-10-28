import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useUpdateMutation } from '../slices/usersApiSlice';
import { setUser } from '../slices/authSlice';

function User() {
  const { userInfo } = useSelector((state) => state.auth);
  const { fetchInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [usernom, setUsername] = useState('nonamed');
  const dispatch = useDispatch();
  const [edituser, { isLoading }] = useUpdateMutation();
  const { token } = useSelector((state) => state.auth);
  //  ON FAIT UN STATE POUR LE MENU CONTEXTUEL
  const [open, setOpen] = useState('false');

  useEffect(() => {
    if (!userInfo) {
      toast.error('You are not logged in yet');
      navigate('/login');
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(token);
      const res = await edituser({ token, usernom }).unwrap();
      //   ON APPELLE ICI AUSSI COMME DANS LA PAGE LOGIN LA FONCTION SETUSER POUR QUE LES INFOS PROFILES
      //   SOIENT UPDATEES DANS LE STATE ET LE LOCALSTORAGE AVEC LE NOUVEAU USERNAME
      dispatch(setUser({ ...res }));
      toast.success(`new username set to:${res.body.userName}`);
      console.log(res.message);
      console.log(res.body.userName);
    } catch (err) {
      console.log('il ya une erreur non repertoriée');
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <main>
      <div className="header">
        <h1>
          Welcome back
          <br />
          {fetchInfo &&
            `${fetchInfo.body.firstName} ${fetchInfo.body.lastName} !`}
        </h1>
        <Link
          className="edit-button"
          onClick={() => {
            setOpen(!open);
          }}
          {...open}
        >
          Edit Name
        </Link>
      </div>

      <section
        className={open ? 'sign-in-content display' : ' sign-in-content hide'}
      >
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

      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default User;
