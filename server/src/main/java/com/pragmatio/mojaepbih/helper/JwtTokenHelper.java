package com.pragmatio.mojaepbih.helper;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.concurrent.TimeUnit;

public class JwtTokenHelper {
    private static JwtTokenHelper jwTokenHelper = null;
    private static final long EXPIRATION_LIMIT = 30;
    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private JwtTokenHelper() {
    }
    public static JwtTokenHelper getInstance() {
        if(jwTokenHelper == null)
            jwTokenHelper = new JwtTokenHelper();
        return jwTokenHelper;
    }

    public String generatePrivateKey(String username, String password) {
        return Jwts
                .builder()
                .setSubject(username)
                .setSubject(password)
                .setExpiration(getExpirationDate())
                .signWith(key)
                .compact();
    }

    public void claimKey(String privateKey) throws ExpiredJwtException, MalformedJwtException {
        Jwts
                .parser()
                .setSigningKey(key)
                .parseClaimsJws(privateKey);
    }

    private Date getExpirationDate() {
        long currentTimeInMillis = System.currentTimeMillis();
        long expMilliSeconds = TimeUnit.MINUTES.toMillis(EXPIRATION_LIMIT);
        return new Date(currentTimeInMillis + expMilliSeconds);
    }
}
