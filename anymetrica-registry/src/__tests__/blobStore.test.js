import { isBlobAddress, makeBlobAddress, parseBlobAddress } from '../blobStore';

describe('blobStore', () => {
  test('parseBlobAddress - with shard', async () => {
    const A = '[[myShard:myBucket/$argon2i$v=19$unrecognized$m=120,t=5000,p=2$EkCWX6pSTqWruiR0]]';
    const parsed = parseBlobAddress(A);
    expect(parsed).toEqual({
      address: '[[myShard:myBucket/$argon2i$v=19$unrecognized$m=120,t=5000,p=2$EkCWX6pSTqWruiR0]]',
      shard: 'myShard',
      bucket: 'myBucket',
      key: '$argon2i$v=19$unrecognized$m=120,t=5000,p=2$EkCWX6pSTqWruiR0',
    });
    expect(makeBlobAddress(parsed.shard, parsed.bucket, parsed.key)).toEqual(A);
    expect(isBlobAddress(A)).toBeTruthy();
  });
  test('parseBlobAddress - without shard', async () => {
    const A = '[[myBucket/$argon2i$v=19$unrecognized$m=120,t=5000,p=2$EkCWX6pSTqWruiR0]]';
    const parsed = parseBlobAddress(A);
    expect(parsed).toEqual({
      address: '[[myBucket/$argon2i$v=19$unrecognized$m=120,t=5000,p=2$EkCWX6pSTqWruiR0]]',
      shard: null,
      bucket: 'myBucket',
      key: '$argon2i$v=19$unrecognized$m=120,t=5000,p=2$EkCWX6pSTqWruiR0',
    });
    expect(makeBlobAddress(parsed.shard, parsed.bucket, parsed.key)).toEqual(A);
    expect(isBlobAddress(A)).toBeTruthy();
  });
});
