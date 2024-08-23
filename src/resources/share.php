<?php

$protocol = $_SERVER['PROTOCOL'] = isset($_SERVER['HTTPS']) && !empty($_SERVER['HTTPS']) ? 'https' : 'http';
$host = $protocol . '://' . $_SERVER['HTTP_HOST'];
$title = 'Title1123';
$description = 'Description';
$image = $host . '/images/podcast/main.jpg';
$redirect = $host . '/';

// Uncomment the code below and fill in the pages if necessary
$pages = [

];


$page = @$pages[$_GET['page']];

if ($page) {
	$title = !is_null(@$page['title']) ? $page['title'] : $title;
	$description = !is_null(@$page['description']) ? $page['description'] : $description;
	$image = !is_null(@$page['image']) ? $page['image'] : $image;
	$redirect = !is_null(@$page['redirect']) ? $page['redirect'] : "/{$_GET['page']}";
}

if ($_GET['page'] == 'result')
{
	$title = 'Game';
	$description = 'GameDescription';
	$image = $host . '/images/share/' . @$_GET['image'] . '.jpg';
	$redirect = $host . '/game.html';
}

if ($_GET['page'] == 'result0')
{
	$title = 'Результат1';
	$description = 'Описание';
	$image = $host . '/images/share/share-1.jpg';
	$redirect = $host . '/test.html';
}

if ($_GET['page'] == 'result1')
{
	$title = 'Результат2';
	$description = 'Описание';
	$image = $host . '/images/share/share-2.jpg';
	$redirect = $host . '/test.html';
}

if ($_GET['page'] == 'result2')
{
	$title = 'Результат3';
	$description = 'Описание';
	$image = $host . '/images/share/share-1.jpg';
	$redirect = $host . '/test.html';
}
?>
<!doctype html>
<html lang="ru">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width">
	<meta name="description" content="<?= htmlspecialchars($description) ?>">
	<meta property="og:type" content="website">
	<meta property="og:title" content="<?= htmlspecialchars($title) ?>">
	<meta property="og:description" content="<?= htmlspecialchars($description) ?>">
	<?if (!preg_match("/facebook|facebot/i", $_SERVER['HTTP_USER_AGENT'])) {?>
		<meta property="og:url" content="<?= htmlspecialchars($redirect) ?>">
	<?}?>
	<meta property="og:image" content="<?= htmlspecialchars($image) ?>">
	<meta property="og:image:type" content="image/jpeg">
	<meta property="og:image:width" content="1936">
	<meta property="og:image:height" content="1008">
	<meta property="og:locale" content="ru_RU">
	<meta name="twitter:card" content="summary_large_image">
	<meta name="twitter:title" content="<?= htmlspecialchars($title) ?>">
	<meta name="twitter:description" content="<?= htmlspecialchars($description) ?>">
	<meta name="twitter:image" content="<?= htmlspecialchars($image) ?>" />
	<title><?= $title ?></title>
</head>
<?if (preg_match("/facebook|facebot/i", $_SERVER['HTTP_USER_AGENT'])) {?>
<body>
<?} else {?>
	<body onload="window.location = '<?= $redirect ?>'"></body>
<?}?>
</html>
