import { useNavigate } from "react-router-dom"

function Signup_Profile(){
    const navigate = useNavigate();

    function goToHome(event) {
        event.preventDefault(); // Prevent default form submission
        console.log('going');
        navigate('/home');
    }

    return(
        <>
        
       

        <div className='edit-profile'>
                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwdIVSqaMsmZyDbr9mDPk06Nss404fosHjLg&s" alt="profile-pic"></img>
                 <h2>Edit your profile</h2>
                
                <form onSubmit={goToHome}>
                    <label>
                        First Name:
                        <input type="text" placeholder="John" />
                    </label>
                    <label>
                        Last Name:
                        <input type="text" placeholder="Doe"  />
                    </label>
                    <label>
                        Age:
                        <input type="number" placeholder="Age" min="13" max="120"  />
                    </label>
                    <label>
                        Location:
                        <input type="text" placeholder="United States" min="13" max="120"  />
                    </label>
                    <label>
                        Short Bio:
                        <input type="text" placeholder="Hello!" min="13" max="120"  />
                    </label>
                    <button type='submit'>Save and Continue</button>
                </form>
            </div>

        
        </>
    )
}
export default Signup_Profile