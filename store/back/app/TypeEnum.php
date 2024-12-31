<?php

namespace App\Enums;

enum TypeEnum: string
{
    case BUY = 'buy';
    case RENT = 'rent';

    public static function toArray(): array
    {
        return [
            self::BUY,
            self::RENT
        ];
    }

    public static function isValid(string $type): bool
    {
        return in_array($type, self::toArray());
    }
}
