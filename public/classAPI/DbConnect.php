<?php 

    // DATEBASE CONNECTION

    class DbConnect{
        // private $server = 'chritlibertyassembly.org.ng';
        // private $dbname = 'christli_class';
        // private $user = 'christli_class_admin';
        // private $pass = 'classppocoPlanamaec0106++';
        private $server = 'localhost';
        private $dbname = 'class';
        private $user = 'root';
        private $pass = '';
        

        public function connect(){
            try{
                $conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname ,$this->user, $this->pass);
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                return $conn;
            }
                catch (\Exception $e){
                    echo "Database Error: " . $e->getMessage();
                } 
            }

    }

?>