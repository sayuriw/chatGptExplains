

import CodeExplainer from '../../shared/CodeExplainer';
import History from '../../shared/History';
import PersonaPicker from '../../shared/PersonaPicker';

const Home = () => {
  
  return (
      <main className="w-full mt-20 section-container">
        <PersonaPicker />
        <History />
        <CodeExplainer />
      </main>
  )
}

export default Home 
