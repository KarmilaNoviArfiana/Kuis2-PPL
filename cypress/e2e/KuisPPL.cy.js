const credentials = {
  user_1: {
    username: 'admin',
    password: '1234',
  },
  user_2: {
    username : 'admin',
    password: 'admin'
  }
};

const loginUsingForm = (credentials) => {
    cy.get("input[name=username]").type(credentials.username);
    cy.get("input[name=password]").type(credentials.password);
    cy.contains('Login').click();
}

const dataPasien = (credentials) => {
  cy.contains('Data Pasien').click();
}

describe('Checks User Login', () => {
  beforeEach('Log in the user', () => {
     cy.visit("http://localhost/UASWEB/index.php");
  });

  it('salah username atau password', () => {
    loginUsingForm(credentials.user_1);
    cy.location("pathname").should("not.include", "/user");
  });

  it('username and password benar', () => {
    loginUsingForm(credentials.user_2);
    cy.location("pathname").should("include", "/user");
    cy.contains('Obat Masuk').click();
    cy.contains('+ Data').click();
    cy.get("input[name=tanggal_masuk]").type('10-11-2022')
    cy.get("input[name=nama_obat]").type('Sanaflu');
    cy.contains('Simpan').click();
    cy.get("input[name=jenis_obat]").type('Obat menurunkan suhu tubuh');
    cy.get("input[name=bentuk_obat]").type('Kaplet');
    cy.get("input[name=harga_beli]").type('3500');
    cy.get("input[name=jumlah_masuk]").type('5');
    cy.contains('Simpan').click();
    cy.get("input[type='search']").type('Promag')
    cy.get("input[type='search']").type(' Anak')
    cy.contains('Ubah Password').click();
    cy.get("input[name=password1]").type('admin')
    cy.contains('Update').click();
    cy.get("input[name=password2]").type('admin')
    cy.get("input[name=password3]").type('admin')
    cy.contains('Update').click();
  });

  
})