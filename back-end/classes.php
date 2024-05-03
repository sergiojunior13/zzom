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


// '[{"name":"Playlist 1","id":"1","musics":[{"id":"1","band":"Teste","title":"Titulo"},{"id":"2","band":"Teste 2","title":"Titulo 2"}]},{"name":"Playlist 2","id":"2","musics":[{"id":"1","band":"Teste playlist 2","title":"Titulo playlist 2"},{"id":"2","band":"Teste playlist 2 2","title":"Titulo playlist 2 2"}]}]'

class playlistActions
{

    public static function createPlaylist($userName, $playlistName, $playlistID) 
    {
        require "./Connection.php";

        // Verifica se existe usuário
        $query = "SELECT username FROM users WHERE username = '$userName'";
        $result = mysqli_query($mysqli, $query);
        $result = mysqli_fetch_assoc($result);
        
        if ($result == null) {
            return "Usuário não encontrado";
            exit();
        }

        // Pesquisa por playlist
        $query = "SELECT playlist FROM users WHERE username = '$userName'";
        $result = mysqli_query($mysqli, $query);
        $result = mysqli_fetch_assoc($result);

        $arrayPlaylist = json_decode($result["playlist"], true);

        $key = array_keys($arrayPlaylist);
        $getLastKey = end($key);

        // Verifica se o JSON ta vazio
        if ($getLastKey == false) {
            $arrayPlaylist[0] = ["name" => "$playlistName", "id" => "$playlistID", "musics" => []];
        } else {
            $arrayPlaylist[$getLastKey + 1] = ["name" => "$playlistName", "id" => "$playlistID", "musics" => []];
        }

        // Escreve no banco de dados
        $newJson = json_encode($arrayPlaylist);
        $updatePlaylist = "UPDATE users SET playlist = '$newJson' WHERE username = '$userName'";
        $update = mysqli_query($mysqli, $updatePlaylist);
    }

    public static function addMusicToPlaylist($userName, $idPlaylist, $idMusic, $band, $musicTitle)
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

    public static function removeMusicFromPlaylist()
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

    public static function getFullPlaylistData()
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
    public static function sign($username, $password)
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
            http_response_code(400);
            return "Nome de usuário já existe, tente outro nome!";
        }
    }

    public static function login($nickname, $password)
    {
        require "./Connection.php";

        $query = "SELECT username, keyphrase FROM users WHERE username = '$nickname' AND keyphrase = '$password'";
        $searchUser = mysqli_query($mysqli, $query);
        $searchUser = mysqli_fetch_assoc($searchUser);

        if ($searchUser == null) {
            http_response_code(400);
            return "Usuário e/ou senha incorretos!";
        }
    }
}

playlistActions::createPlaylist("Frederico", "Coisa nova", "0");
// $resulting->addMusicToPlaylist("Farelo", 0, 3, "Linkin Park", "In the end");
//TODO: create new method to create playlist createPlaylist();
