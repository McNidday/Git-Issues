import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Auth from "./pages/Auth"
import Issues from "./pages/Issues"
import { Provider } from 'react-redux'
import store from './redux/store'
import './css/defaults.css'
import { ClientProvider } from './components/contexts/ClientContext'
import '../node_modules/normalize.css/normalize.css'


function App() {
    return (
        <Router>
            <Provider store={store}>
                <div className="App">
                    <Switch>
                        <ClientProvider value={null}>
                            <Route path="/" exact component={Auth} />
                            <Route path="/issues" exact component={Issues} />
                        </ClientProvider>
                    </Switch>
                </div>
            </Provider>
        </Router>
    );
}

export default App;
