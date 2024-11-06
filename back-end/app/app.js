import { express } from "express";
import { cors } from "cors";
import { dotenv } from "dotenv";
//const google_places_controller = ('./controllers/google_places_controller');
//I left this here incase you might need it later



dotenv.config({ silent: true });

const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello!");
});

export { app };
