import "../../styles/theme.scss";
import "../../styles/theme.scss.liquid";
import {mountReact} from "../../react/mountReact.jsx";
import ExampleComponent from "../../react/components/ExampleComponent.jsx";

mountReact('#theme-react-wrapper', ExampleComponent);
