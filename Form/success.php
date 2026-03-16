<?php if (!empty($_SESSION['success'])): ?>
    <div class="success">
        <?php foreach ($_SESSION['success'] as $message): ?>
            <p class="msgSuccess"><?= htmlspecialchars($message) ?></p>
        <?php endforeach; ?>
    </div>
<?php endif; ?>

<?php unset($_SESSION['success']); ?>