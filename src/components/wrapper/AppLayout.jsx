function AppLayout(props) {
   return (
      <div className="grid grid-cols-2">

         <nav className="border-r-2 border-gray-700">

         </nav>

         <main>
            {props.children}
         </main>

      </div>

   );
}

export default AppLayout;