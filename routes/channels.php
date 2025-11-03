<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::routes(['middleware' => ['auth:sanctum']]);

Broadcast::channel('users.{userId}', function($user, $userId) {
    return (int) $user->id === (int) $userId;
});

Broadcast::channel('room', function($user) {
    return ['id' => $user->id, 'name' => $user->name];
});
