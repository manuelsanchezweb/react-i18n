import "./App.css";
import Button from "./components/Button";
import { Description } from "./components/Description";
import { LanguageSelector } from "./components/LanguageSelector";
import { Title } from "./components/Title";

function App() {
  return (
    <div className="page-wrapper">
      <header>
        <div className="logo shadow-neo">LOGO</div>
        <LanguageSelector />
      </header>
      <main>
        <div className="text">
          <Title className="text__title" />
          <Description className="text__description" />
          <Button />
        </div>
      </main>
      <footer>Copyright 2023 - Manuel Sanchez - All Rights Reserved</footer>
    </div>
  );
}

export default App;
