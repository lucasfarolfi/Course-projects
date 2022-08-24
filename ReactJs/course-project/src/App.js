import TodoApp from "./pages/TodoApp";
import FilterProvider from "./state/filter/Provider"
import TodosProvider from "./state/todo/Provider"

function App() {
  return (
    // Providers que passam estados como Global para todas as páginas da aplicação
    // Filter - Filtro de busca das tarefas
    // Todo - Dados das tarefas armazenadas
    <TodosProvider>
      <FilterProvider>
        <TodoApp />
      </FilterProvider>
    </TodosProvider>
  );
}

export default App;
