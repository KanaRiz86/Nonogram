<?php if (!empty($_SESSION['errors'])): ?>
    <div class="errors">
        <?php foreach ($_SESSION['errors'] as $error): ?>
            <p class="msgError"><?= htmlspecialchars($error) ?></p>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

<?php unset($_SESSION['errors']); ?>