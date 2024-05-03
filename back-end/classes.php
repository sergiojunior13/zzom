<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require "./../vendor/autoload.php";

// $hardcodedPlaylists = [
//     {
//       name: "Playlist 1",
//       id: "1",
//       musics: [
//         { id: "1", band: "Teste", title: "Titulo" },
//         { id: "2", band: "Teste 2", title: "Titulo 2" },
//       ],
//     },
//     {
//       name: "Playlist 2",
//       id: "2",
//       musics: [
//         { id: "1", band: "Teste playlist 2", title: "Titulo playlist 2" },
//         { id: "2", band: "Teste playlist 2 2", title: "Titulo playlist 2 2" },
//       ],
//     },
//   ];


// {"playlists":[{"name":"Playlist 1","id":"1","musics":[{"id":"1","band":"Teste","title":"Titulo"},{"id":"2","band":"Teste 2","title":"Titulo 2"}]},{"name":"Playlist 2","id":"2","musics":[{"id":"1","band":"Teste playlist 2","title":"Titulo playlist 2"},{"id":"2","band":"Teste playlist 2 2","title":"Titulo playlist 2 2"}]}]}
class playlistActions 
{

    public function createPlaylist($username, $playlistName, $playlistId) {
        require "./Connection.php";

        $query = "SELECT playlist FROM users WHERE username = '$username'";
        $result = mysqli_query($mysqli, $query);
        $result = mysqli_fetch_assoc($result);

        $getPlaylist = json_decode($result["playlist"], true);
        dump($getPlaylist);
        $key = array_keys($getPlaylist);
        $lastKey = end($key);
        dump($lastKey);

        $getPlaylist[$lastKey + 1] = ["name" => "$playlistName", "id" => "$playlistId", "musics" => []];

        $newPlaylist = json_encode($getPlaylist);

        $createPlaylist = "UPDATE users SET playlist = '$newPlaylist' WHERE username = '$username'";
        $update = mysqli_query($mysqli, $createPlaylist);
    }

    public function addMusicToPlaylist($userName, $idPlaylist, $idMusic, $band, $musicTitle) 
    {

        // Importa conexão
        require "./Connection.php";

        // Query para pegar a playlist do usuário $userName
        $query = "SELECT playlist FROM users";
        $result = mysqli_query($mysqli, $query);
        $result = mysqli_fetch_assoc($result);

        $getFullPlaylist = $result["playlist"];
       
        // Pega a playlist que era string e transforma em array associativo
        $playlistObject = json_decode($getFullPlaylist, true);

        // Pega a última chave do array associativo
        $key = array_keys($playlistObject[$idPlaylist]["musics"]);
        $lastKey = end($key);
        
        // Cria uma nova chave e adiciona valores
        $playlistObject[$idPlaylist]["musics"][$lastKey + 1] = ["id" => "$idMusic", "band" => "$band", "title" => "$musicTitle"]; 

        // Volta para JSON, string
        $newJson = json_encode($playlistObject);

        // Atualiza no DB
        $queryUpdate = "UPDATE users SET playlist = '$newJson' WHERE username = '$userName'";
        $updatePlaylist = mysqli_query($mysqli, $queryUpdate);

    }

    public function removeMusicFromPlaylist() 
    {

        //TODO: adicionar funcionalidade, (no return), adicionar parâmetros: iddaplaylist e idmusica
        require "./Connection.php";
        // Ideia: pede id no parametro...
        $query = "SELECT playlist FROM users";
        $result = mysqli_query($mysqli, $query);

        $playlist = mysqli_fetch_assoc($result);

        // Bota em objeto php, modifica, e dps volta pra JSON (string) e update na tabela;
        // var_dump(json_decode($playlist["playlist"]));
    }

    public function getFullPlaylistData() 
    {
        //TODO: precisa retornar info da playlist, adicionar parâmetros: iddaplaylist
        require "./Connection.php";

        $query = "SELECT playlist FROM users";
        $result = mysqli_query($mysqli, $query);

        $playlist = mysqli_fetch_assoc($result);

        var_dump(json_decode($playlist["playlist"]));
    }
}


class userActions 
{
    public function sign($username, $password) 
    {
        require "./Connection.php";

        $query = "SELECT username FROM users WHERE username = '$username'";
        $searchSignedUser = mysqli_query($mysqli, $query);
        $searchSignedUser = mysqli_fetch_assoc($searchSignedUser);

        if ($searchSignedUser == null) {
            $query = "INSERT INTO users VALUES (0, '$username', '$password', '{}')";
            $updatingTable = mysqli_query($mysqli, $query);
            return "Usuário cadastrado!";
        } else {
            return "Nome de usuário já existe, tente outro nome!";
        }
    }

    public function login($nickname, $password) 
    {
        require "./Connection.php";
        
        $query = "SELECT username, keyphrase FROM users WHERE username = '$nickname' AND keyphrase = '$password'";
        $searchUser = mysqli_query($mysqli, $query);
        $searchUser = mysqli_fetch_assoc($searchUser);

        if ($searchUser == null) {
            return "Usuário e/ou senha incorretos!";
        }

    }

}
require "./Connection.php";

$query = "SELECT playlist FROM users";
$result = mysqli_query($mysqli, $query);
$result = mysqli_fetch_assoc($result);

dump( json_decode($result["playlist"], true));

$resulting = new playlistActions();
// $resulting-> addMusicToPlaylist("Fábio", 0, 3, "Linkin Park", "In the end");
$resulting-> createPlaylist("Fábio", "Playlist teste", "5");
