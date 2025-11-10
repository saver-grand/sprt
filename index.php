<?php
// router: serve protected files only through PHP

$file = $_GET['file'] ?? '';

$allowed = ['index.html', 'ma-style.css', 'ma-script.js'];
$path = __DIR__ . '/protected/' . basename($file);

if (in_array($file, $allowed) && file_exists($path)) {
    $ext = pathinfo($path, PATHINFO_EXTENSION);
    $mime = [
        'html' => 'text/html',
        'css'  => 'text/css',
        'js'   => 'application/javascript',
    ][$ext] ?? 'text/plain';

    header("Content-Type: $mime");
    readfile($path);
    exit;
}

http_response_code(403);
echo "Access denied.";
