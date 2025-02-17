<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'movie_id',
        'type',
        'card_number',
        'amount',
        'created_at'
    ];

    public $timestamps = false;
}
